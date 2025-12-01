import { useState, useRef } from 'react';
import { Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { t } from '../../i18n';
import ImageUploader from '../../components/ImageUploader';
import ImagePreview from '../../components/ImagePreview';
import WelcomeGuide, { type WelcomeGuideRef } from '../../components/WelcomeGuide';
import type { UploadedImage } from '../../types';

/**
 * 可变图像生成器页面
 */
const MagicianPage = () => {
  const [beforeImage, setBeforeImage] = useState<UploadedImage | null>(null);
  const [afterImage, setAfterImage] = useState<UploadedImage | null>(null);
  const guideRef = useRef<WelcomeGuideRef>(null);

  const handleOpenGuide = () => {
    guideRef.current?.open();
  };

  return (
    <>
      {/* 新手引导 */}
      <WelcomeGuide ref={guideRef} />
      
      <div className="space-y-6">
      {/* 标题和说明 */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-3xl font-bold text-gray-800">
            {t('app.subtitle' as any)}
          </h2>
          <Button
            type="text"
            icon={<QuestionCircleOutlined />}
            onClick={handleOpenGuide}
            className="text-gray-500 hover:text-blue-600"
            title={t('guide.openGuide' as any)}
          >
            {t('guide.openGuide' as any)}
          </Button>
        </div>
        <p className="text-gray-600">
          {t('app.description' as any)}
        </p>
      </div>

      {/* 图片上传区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageUploader
          type="before"
          image={beforeImage}
          onImageChange={setBeforeImage}
        />
        <ImageUploader
          type="after"
          image={afterImage}
          onImageChange={setAfterImage}
        />
      </div>

      {/* 预览区域 */}
      <ImagePreview
        beforeImage={beforeImage?.base64 || null}
        afterImage={afterImage?.base64 || null}
      />
      </div>
    </>
  );
};

export default MagicianPage;

