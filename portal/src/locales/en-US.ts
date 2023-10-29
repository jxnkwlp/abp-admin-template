import common from './en-US/common';
import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pages from './en-US/pages';
import file from './en-US/pages.file';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';
import identityrole from './en-US/pages.identityrole';
import identityuser from './en-US/pages.identityuser';
import organizationunit from './en-US/pages.organizationunit';
import settings2 from './en-US/pages.settings';
import profile from './en-US/pages.profile';
import identitysecuritylog from './en-US/pages.identitysecuritylog';
import auditlog from './en-US/pages.auditlog';
import identityclaimtype from './en-US/pages.identityclaimtype';
import identityclient from './en-US/pages.identityclient';

export default {
    'navBar.lang': 'Languages',
    'layout.user.link.help': 'Help',
    'layout.user.link.privacy': 'Privacy',
    'layout.user.link.terms': 'Terms',
    'app.copyright.produced': 'Produced by Passingwind',
    'app.preview.down.block': 'Download this page to your local project',
    'app.welcome.link.fetch-blocks': 'Get all block',
    'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
    ...globalHeader,
    ...menu,
    ...settingDrawer,
    ...settings,
    ...pwa,
    ...component,
    ...common,
    ...pages,
    ...file,
    ...identityrole,
    ...identityuser,
    ...organizationunit,
    ...settings2,
    ...profile,
    ...identitysecuritylog,
    ...auditlog,
    ...identityclaimtype,
    ...identityclient,
};
