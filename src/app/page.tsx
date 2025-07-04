import { FiMail, FiLock } from "react-icons/fi";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        <div className="px-8 pt-8 pb-6 bg-white">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 rounded-xl w-16 h-16 flex items-center justify-center">
              <div className="bg-blue-600 rounded-full w-10 h-10" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800">DentalCare</h1>
          <p className="text-sm text-gray-600 text-center mt-1">Sistema profissional de agendamento</p>
        </div>

        <div className="bg-gray-50 px-8 py-8">
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail Profissional
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Esqueceu a senha?
              </Link>
            </div>

            <div>
              <Link
                href="/dashboard"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Acessar Dashboard
              </Link>
            </div>
          </form>
        </div>

        <div className="bg-gray-50 border-t border-gray-100 px-8 py-4 text-center">
          <p className="text-xs text-gray-500">
            Problemas com acesso?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Contate o administrador
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}