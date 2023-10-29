import common from './zh-CN/common';
import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pages from './zh-CN/pages';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
import identityrole from './zh-CN/pages.identityrole';
import identityuser from './zh-CN/pages.identityuser';
import organizationunit from './zh-CN/pages.organizationunit';
import file from './zh-CN/pages.file';
import settings2 from './zh-CN/pages.settings';
import profile from './zh-CN/pages.profile';
import identitysecuritylog from './zh-CN/pages.identitysecuritylog';
import auditlog from './zh-CN/pages.auditlog';
import identityclaimtype from './zh-CN/pages.identityclaimtype';
import identityclient from './zh-CN/pages.identityclient';
import openIddictApplication from './zh-CN/pages.openIddictApplication';
import openIddictScope from './zh-CN/pages.openIddictScope';

export default {
    'navBar.lang': '语言',
    'layout.user.link.help': '帮助',
    'layout.user.link.privacy': '隐私',
    'layout.user.link.terms': '条款',
    'app.copyright.produced': 'Power by passingwind',
    'app.preview.down.block': '下载此页面到本地项目',
    'app.welcome.link.fetch-blocks': '获取全部区块',
    'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
    ...pages,
    ...globalHeader,
    ...menu,
    ...settingDrawer,
    ...settings,
    ...pwa,
    ...component,
    ...common,
    ...identityrole,
    ...identityuser,
    ...organizationunit,
    ...settings2,
    ...file,
    ...profile,
    ...identitysecuritylog,
    ...auditlog,
    ...identityclaimtype,
    ...identityclient,
    ...openIddictApplication,
    ...openIddictScope,
};
