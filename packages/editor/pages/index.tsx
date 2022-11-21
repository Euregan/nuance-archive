import { themeClass } from '../ui/theme.css';
import Editor from '../ui/Editor';

const Page = () => (
  <main className={themeClass} style={{ width: '100vw', height: '100vh' }}>
    <Editor />
  </main>
);

export default Page;
