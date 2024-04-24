import Image from "next/image"
import Link from "next/link"
import { footerLinks } from "@/constants" 

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <h1 className="text-2xl font-semibold mb-6 text-primary-blue">ZENTRIUS</h1>
          <p className="text-base text-black -mt-9">
            All rights reserved.
          </p>
          <p className="text-base text-black -mt-4">Images courtesy of Imagin Studio.</p>
        </div>

        <div className="footer__links">
          {footerLinks.map((link) => (
            <div key={link.title} className="footer__link text-black">
              <h3 className="font-medium">{link.title}</h3>
              {link.links.map((item) => (
                <Link 
                  key={item.title}
                  href={item.url} 
                  className="text-gray-500 hover:text-black hover:font-medium"
                >
                  {item.title}
                </Link>
              ))}
              

            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
        <p className="flex flex-wrap"><span className="text-gray-500">© 2024 ZENTRIUS</span></p>
        <div className="footer__copyrights-link">
            <Link href="/" className="text-gray-500 hover:text-black hover:font-medium min-[375px]:max-[425px]:-mt-3">
              Terms of Use
            </Link>
            <Link href="/" className="text-gray-500 hover:text-black hover:font-medium min-[375px]:max-[425px]:-mt-3">
              Privacy Policy
            </Link>
          </div>    
      </div>
    </footer>
  )
}

export default Footer