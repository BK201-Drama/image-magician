import React, { useState, useEffect } from 'react';
import { Card, Spin, message, Button, Modal } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { t } from '../i18n';
import { generateBlendedImage } from '../utils/imageBlender';

interface ImagePreviewProps {
  beforeImage: string | null;
  afterImage: string | null;
}

/**
 * 图片预览组件
 * 展示可变图像的缩略图和大图效果
 */
const ImagePreview: React.FC<ImagePreviewProps> = ({
  beforeImage,
  afterImage,
}) => {
  const [blendedImage, setBlendedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (beforeImage && afterImage) {
      setIsGenerating(true);
      generateBlendedImage(beforeImage, afterImage)
        .then((result) => {
          setBlendedImage(result);
          message.success(t('message.generateSuccess' as any));
        })
        .catch((error) => {
          console.error('生成失败:', error);
          message.error(t('message.generateFailed' as any));
        })
        .finally(() => {
          setIsGenerating(false);
        });
    } else {
      setBlendedImage(null);
    }
  }, [beforeImage, afterImage]);

  const handleDownload = () => {
    if (!blendedImage) return;

    const link = document.createElement('a');
    link.href = blendedImage;
    link.download = `image-magician-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success(t('message.downloadSuccess' as any));
  };

  const hasImages = beforeImage && afterImage;

  return (
    <>
      <Card
        title={t('preview.title' as any)}
        className="shadow-md"
        styles={{ body: { padding: '24px' } }}
        extra={
          blendedImage && (
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700"
            >
              {t('preview.download' as any)}
            </Button>
          )
        }
      >
        <div className="min-h-[400px]">
          {!hasImages ? (
            <div className="text-center text-gray-400 py-20">
              <p className="text-lg mb-2">{t('preview.uploadPrompt' as any)}</p>
              <p className="text-sm">{t('preview.uploadHint' as any)}</p>
            </div>
          ) : isGenerating ? (
            <div className="text-center py-20">
              <Spin size="large" />
              <p className="mt-4 text-gray-600">{t('preview.generating' as any)}</p>
            </div>
          ) : blendedImage ? (
            <div className="space-y-6">
              {/* 说明 */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700 text-center">
                  💡 {t('preview.description' as any)}
                </p>
              </div>

              {/* 可变图像展示 */}
              <div className="flex flex-col items-center">
                <div 
                  className="bg-white p-8 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-all hover:shadow-xl max-w-2xl"
                  onClick={() => setIsModalOpen(true)}
                >
                  <img
                    src={blendedImage}
                    alt="Variable Image"
                    className="w-full h-auto rounded shadow-lg"
                  />
                </div>
                <p className="mt-4 text-gray-600 text-center">
                  👆 {t('preview.clickToView' as any)}
                </p>
              </div>

              {/* 使用提示 */}
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="text-yellow-600 mr-2">⚠️</span>
                  {t('tips.title' as any)}
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• {t('tips.tip1' as any)}</li>
                  <li>
                    • <strong>{t('tips.important' as any)}</strong>
                    {t('tips.tip2' as any)}
                  </li>
                  <li>• {t('tips.tip3' as any)}</li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </Card>

      {/* 大图模态框（黑底） */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width="90%"
        centered
        styles={{
          body: { 
            backgroundColor: '#000', 
            padding: '40px',
            maxHeight: '80vh',
            overflow: 'auto'
          }
        }}
      >
        {blendedImage && (
          <div className="flex flex-col items-center">
            <img
              src={blendedImage}
              alt="Full Size View"
              className="max-w-full h-auto rounded"
            />
            <p className="text-white mt-4 text-center">
              🌙 {t('preview.modalTitle' as any)}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ImagePreview;

