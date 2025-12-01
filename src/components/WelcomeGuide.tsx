import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Modal, Button, Steps, Card, Space, Checkbox } from 'antd';
import { 
  UploadOutlined, 
  EyeOutlined, 
  DownloadOutlined,
  CloseOutlined 
} from '@ant-design/icons';
import { t } from '../i18n';

const { Step } = Steps;

const GUIDE_STORAGE_KEY = 'image-magician-welcome-guide-seen';

interface WelcomeGuideProps {
  /** 是否强制显示（用于测试或重新显示） */
  forceShow?: boolean;
  /** 关闭引导的回调 */
  onClose?: () => void;
}

export interface WelcomeGuideRef {
  /** 打开引导弹窗 */
  open: () => void;
}

/**
 * 新手引导组件
 * 首次访问时显示欢迎信息和功能说明
 */
const WelcomeGuide = forwardRef<WelcomeGuideRef, WelcomeGuideProps>(({ 
  forceShow = false,
  onClose 
}, ref) => {
  // 检查是否已经设置不再自动显示
  const checkDontShowAgain = (): boolean => {
    try {
      return localStorage.getItem(GUIDE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(checkDontShowAgain());

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      setCurrentStep(0);
      // 根据 localStorage 设置默认值
      setDontShowAgain(checkDontShowAgain());
    }
  }));

  useEffect(() => {
    // 检查是否已经设置不再自动显示
    const hasDisabledAutoShow = checkDontShowAgain();
    
    // 如果强制显示或未禁用自动显示，则显示引导
    if (forceShow || !hasDisabledAutoShow) {
      setIsOpen(true);
      // 设置默认勾选状态
      setDontShowAgain(hasDisabledAutoShow);
    }
  }, [forceShow]);

  const handleClose = () => {
    setIsOpen(false);
    // 根据勾选状态更新 localStorage
    if (dontShowAgain) {
      localStorage.setItem(GUIDE_STORAGE_KEY, 'true');
    } else {
      // 如果取消勾选，则移除设置
      localStorage.removeItem(GUIDE_STORAGE_KEY);
    }
    onClose?.();
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  // 步骤内容配置
  const steps = [
    {
      title: t('guide.step1.title' as any),
      icon: <UploadOutlined />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {t('guide.step1.description' as any)}
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-2">
              <strong>{t('guide.step1.tip' as any)}</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>{t('guide.step1.tip1' as any)}</li>
              <li>{t('guide.step1.tip2' as any)}</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: t('guide.step2.title' as any),
      icon: <EyeOutlined />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {t('guide.step2.description' as any)}
          </p>
          
          {/* 示例效果展示 */}
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-block bg-white p-6 rounded-lg shadow-lg mb-4">
                  <div className="w-48 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded flex items-center justify-center text-white font-bold text-xl">
                    {t('guide.example.before' as any)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {t('guide.example.whiteBg' as any)}
                </p>
              </div>
              
              <div className="text-center text-gray-400">
                <span className="text-2xl">⬇️</span>
              </div>
              
              <div className="text-center">
                <div className="inline-block bg-black p-6 rounded-lg shadow-lg">
                  <div className="w-48 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded flex items-center justify-center text-white font-bold text-xl">
                    {t('guide.example.after' as any)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {t('guide.example.blackBg' as any)}
                </p>
              </div>
            </div>
          </Card>
          
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-sm text-gray-700">
              💡 <strong>{t('guide.step2.tip' as any)}</strong>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: t('guide.step3.title' as any),
      icon: <DownloadOutlined />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {t('guide.step3.description' as any)}
          </p>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-gray-800 mb-2">
              {t('guide.step3.usageTitle' as any)}
            </h4>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>{t('guide.step3.usage1' as any)}</li>
              <li>{t('guide.step3.usage2' as any)}</li>
              <li>{t('guide.step3.usage3' as any)}</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              ⚠️ <strong>{t('guide.step3.warning' as any)}</strong>
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={700}
      centered
      closeIcon={<CloseOutlined className="text-gray-400" />}
      styles={{
        body: { padding: '32px' },
      }}
      className="welcome-guide-modal"
    >
      <div className="space-y-6">
        {/* 标题 */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('guide.welcome' as any)}
          </h2>
          <p className="text-gray-600">
            {t('guide.subtitle' as any)}
          </p>
        </div>

        {/* 步骤指示器 */}
        <Steps current={currentStep} size="small">
          {steps.map((step, index) => (
            <Step 
              key={index} 
              title={step.title}
              icon={step.icon}
            />
          ))}
        </Steps>

        {/* 步骤内容 */}
        <div className="min-h-[300px] py-4">
          {steps[currentStep].content}
        </div>

        {/* 不再自动显示勾选框 */}
        <div className="pt-2 border-t">
          <Checkbox
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
          >
            {t('guide.dontShowAgain' as any)}
          </Checkbox>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-between items-center pt-4">
          <Button 
            onClick={handleSkip}
            className="text-gray-500"
          >
            {t('guide.skip' as any)}
          </Button>
          
          <Space>
            {currentStep > 0 && (
              <Button onClick={handlePrev}>
                {t('guide.prev' as any)}
              </Button>
            )}
            <Button 
              type="primary" 
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentStep === 2 ? t('guide.start' as any) : t('guide.next' as any)}
            </Button>
          </Space>
        </div>
      </div>
    </Modal>
  );
});

WelcomeGuide.displayName = 'WelcomeGuide';

export default WelcomeGuide;

