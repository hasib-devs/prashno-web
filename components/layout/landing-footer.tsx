import { SITE_NAME } from "@/lib/constants";

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--neutral-200)] bg-[var(--neutral-950)] py-16 text-[var(--neutral-300)]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] text-sm font-bold text-white">প</span>
              {SITE_NAME}
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--neutral-400)]">
              বাংলাদেশের শিক্ষকদের জন্য সম্পূর্ণ বাংলায় তৈরি প্রশ্নব্যাংক ও পরীক্ষা প্রস্তুতির প্ল্যাটফর্ম।
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">প্রোডাক্ট</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white">ফিচার</a></li>
              <li><a href="#pricing" className="hover:text-white">প্রাইসিং</a></li>
              <li><a href="#demo" className="hover:text-white">ডেমো</a></li>
              <li><a href="#" className="hover:text-white">রিসোর্স</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">কোম্পানি</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">আমাদের সম্পর্কে</a></li>
              <li><a href="#" className="hover:text-white">যোগাযোগ</a></li>
              <li><a href="#" className="hover:text-white">প্রাইভেসি পলিসি</a></li>
              <li><a href="#" className="hover:text-white">শর্তাবলী</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">যোগাযোগ</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>support@prashnokotha.com</li>
              <li>+৮৮০ ১৭XX-XXXXXX</li>
              <li>ঢাকা, বাংলাদেশ</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--neutral-800)] pt-8 text-center text-sm text-[var(--neutral-400)]">
          <p>© 2025 {SITE_NAME}। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
