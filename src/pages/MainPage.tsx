import { Layout, Typography } from 'antd';
import { FC } from 'react';
import { LABELS } from '../consts';
import { WidgetsList } from '../components/WidgetsList/WidgetsList';

import classes from './MainPage.module.css';

const MainPage: FC = () => {
  return (
    <Layout className={classes.Layout}>
      <Layout.Header className={classes.Header} title={LABELS.MAIN_PAGE_TITLE}>
        <Typography.Title className={classes.Title} level={3}>
          {LABELS.MAIN_PAGE_TITLE}
        </Typography.Title>
      </Layout.Header>

      <Layout.Content className={classes.LayoutContent}>
        <WidgetsList />
      </Layout.Content>
    </Layout>
  );
};

export default MainPage;
