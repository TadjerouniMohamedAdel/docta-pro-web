import InnerLayout from './InnerLayout';
import InnerSidebar from './InnerSidebar/InnerSidebar';
import InnerContent from './InnerContent/InnerContent';

type InnerLayoutType = typeof InnerLayout & {
  Sidebar: typeof InnerSidebar;
} & { Content: typeof InnerContent };

(InnerLayout as InnerLayoutType).Sidebar = InnerSidebar;
(InnerLayout as InnerLayoutType).Content = InnerContent;

export default InnerLayout as InnerLayoutType;
