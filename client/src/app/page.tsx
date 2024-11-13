"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const HomePage = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      

      {/* Hero Section */}
      <section className="bg-white text-center py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Your Trusted Health Companion
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Simplifying health solutions with cutting-edge technology, tailored services, and expert care.
          </p>
          <Button onClick={() => router.push("/signup")} className="px-8 py-3 text-lg bg-gradient-to-r from-green-400 to-blue-500 text-white">
            Get Started
          </Button>

          <div className="flex justify-center mt-8">
            <Button onClick={() => router.push("/signin")} className="px-8 py-3 text-lg bg-gradient-to-r from-green-400 to-blue-500 text-white">
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Choose Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg text-center">
              <Image src="/img/innovation.jfif" width={260} height={260} alt="Innovation" />
              <h4 className="text-xl font-bold text-gray-800 mt-4">Innovation</h4>
              <p className="text-gray-600 mt-2">
                Cutting-edge solutions to ensure a seamless healthcare experience.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg text-center">
              <Image src="/img/support.jfif" width={260} height={260} alt="Support" />
              <h4 className="text-xl font-bold text-gray-800 mt-4">24/7 Support</h4>
              <p className="text-gray-600 mt-2">
                Always here to assist with your health needs, anytime, anywhere.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg text-center">
              <Image src="/img/trust.jfif" width={260} height={260} alt="Trust" />
              <h4 className="text-xl font-bold text-gray-800 mt-4">Trust</h4>
              <p className="text-gray-600 mt-2">
                Trusted by thousands of users for reliable health insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">
            Stay Updated
          </h3>
          <p className="text-lg mb-8">
            Subscribe to our newsletter for the latest updates on health and technology.
          </p>
          <div className="flex justify-center">
            <Input placeholder="Enter your email" className="max-w-lg" />
            <Button className="ml-2 bg-white text-blue-600 px-6 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Healthynfinity. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link href="/terms">
              <span className="hover:underline text-sm">Terms of Service</span>
            </Link>
            <Link href="/privacy">
              <span className="hover:underline text-sm">Privacy Policy</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
