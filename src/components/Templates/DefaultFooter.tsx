import { CURRENT_DATE } from '../../const/date';
import DefaultLogo from '../Parts/DefaultLogo';
import Link from 'next/link';

const Footer = function render() {
  return (
    <footer className="border-t-background border-t-2 bg-thirdly p-56">
      <div className="flex justify-between">
        <DefaultLogo className="w-150" />
        <div className="flex text-12 children:mb-20 children:pl-48">
          <div>
            <span>規約</span>
            <ul>
              <li>
                <Link className="text-gray-700" href="/terms">
                  利用規約
                </Link>
              </li>
              <li>
                <Link className="text-gray-700" href="/terms/transaction-law">
                  特定商取引法
                </Link>
              </li>
              <li>
                <Link className="text-gray-700" href="/policy/privacy">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link className="text-gray-700" href="/policy/cookie">
                  Cookieポリシー
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p>その他</p>
            <ul>
              <li>
                <Link className="text-gray-700" href="/support">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pt-56 text-right">© {CURRENT_DATE.getFullYear()} HostNavi</div>
    </footer>
  );
};

export default Footer;
