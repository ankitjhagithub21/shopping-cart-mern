

const Footer = () => {
  return (
    <footer className="pt-10 border-t py-6 mt-20">
      <div className="container mx-auto px-5 grid md:grid-cols-4 sm:grid-cols-2 gap-8 text-sm">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/cart" className="hover:underline">Cart</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Return Policy</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li><a href="#" target="_blank" className="hover:underline">GitHub</a></li>
            <li><a href="#" target="_blank" className="hover:underline">LinkedIn</a></li>
            <li><a href="#" target="_blank" className="hover:underline">Twitter</a></li>
          </ul>
        </div>

        {/* Developer */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Developer</h3>
          <p>Developed By <a href="https://ankitjha.vercel.app" className="underline text-blue-400" target="_blank">Ankit Jha</a></p>
          <p className="mt-2 text-sm text-gray-400">© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;