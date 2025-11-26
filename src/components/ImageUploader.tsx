import React from 'react';
import { Upload, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { t } from '../i18n';
import { fileToBase64 } from '../utils/imageUtils';
import type { UploadedImage } from '../types';

const { Dragger } = Upload;

interface ImageUploaderProps {
  type: 'before' | 'after';
  image: UploadedImage | null;
  onImageChange: (image: UploadedImage | null) => void;
}

/**
 * 图片上传组件
 * 支持拖拽上传和点击上传
 */
const ImageUploader: React.FC<ImageUploaderProps> = ({
  type,
  image,
  onImageChange,
}) => {

  const handleUpload: UploadProps['customRequest'] = async (options) => {
    const { file } = options;
    const uploadFile = file as File;

    try {
      const base64 = await fileToBase64(uploadFile);
      onImageChange({
        file: uploadFile,
        preview: base64,
        base64: base64,
      });
    } catch (error) {
      console.error('图片转换失败:', error);
    }
  };

  const handleRemove = () => {
    onImageChange(null);
  };

  const title = t(`upload.${type}` as any);

  return (
    <Card
      title={title}
      className="shadow-md hover:shadow-lg transition-shadow"
      styles={{ body: { padding: '16px' } }}
    >
      {!image ? (
        <Dragger
          name="file"
          multiple={false}
          customRequest={handleUpload}
          accept="image/*"
          showUploadList={false}
          className="bg-gray-50"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined className="text-blue-500" />
          </p>
          <p className="ant-upload-text text-gray-700">
            {t('upload.dragText' as any)}
          </p>
          <p className="ant-upload-hint text-gray-500">
            {t('upload.dragHint' as any)}
          </p>
        </Dragger>
      ) : (
        <div className="relative group">
          <img
            src={image.preview}
            alt={title}
            className="w-full h-auto rounded-lg"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleRemove}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
            >
              {t('upload.delete' as any)}
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 truncate">
            {image.file.name}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ImageUploader;

