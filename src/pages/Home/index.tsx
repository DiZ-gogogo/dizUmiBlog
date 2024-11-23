import PdfViewer from '@/components/Common';
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';

const HomePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <PdfViewer />
      </div>
    </PageContainer>
  );
};

export default HomePage;
