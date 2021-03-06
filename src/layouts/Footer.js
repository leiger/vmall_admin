import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'vmall2',
          title: 'vmall2',
          href: 'https://vmall.leiger.tech',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/leiger/vmall_admin',
          blankTarget: true,
        }
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 Leiger
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
