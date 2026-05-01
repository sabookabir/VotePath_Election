import { FileCheck, CreditCard, Home, FileText } from 'lucide-react';

export function RequiredDocuments() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 pt-28 pb-20 max-w-4xl mx-auto px-4 w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
          
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-6 text-success-600">
              <FileCheck className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Required Documents</h1>
            <p className="text-slate-500 font-medium text-lg">Bring at least ONE of the following approved photo ID documents to your polling booth.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="border border-slate-200 rounded-2xl p-6 hover:border-success-500 hover:shadow-lg transition-all bg-slate-50 hover:bg-white">
              <CreditCard className="w-8 h-8 text-secondary-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">EPIC (Voter ID)</h3>
              <p className="text-slate-500">The standard Election Photo Identity Card issued by the ECI.</p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 hover:border-success-500 hover:shadow-lg transition-all bg-slate-50 hover:bg-white">
              <CreditCard className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Aadhaar Card</h3>
              <p className="text-slate-500">Must have your photograph clearly visible.</p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 hover:border-success-500 hover:shadow-lg transition-all bg-slate-50 hover:bg-white">
              <FileText className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">PAN Card</h3>
              <p className="text-slate-500">Issued by the Income Tax Department.</p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 hover:border-success-500 hover:shadow-lg transition-all bg-slate-50 hover:bg-white">
              <CreditCard className="w-8 h-8 text-slate-700 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Driving License</h3>
              <p className="text-slate-500">Valid driving license with your current photograph.</p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 hover:border-success-500 hover:shadow-lg transition-all bg-slate-50 hover:bg-white">
              <FileText className="w-8 h-8 text-indigo-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Indian Passport</h3>
              <p className="text-slate-500">A valid passport is fully accepted as proof of identity.</p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 hover:border-success-500 hover:shadow-lg transition-all bg-slate-50 hover:bg-white">
              <Home className="w-8 h-8 text-teal-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Bank Passbook</h3>
              <p className="text-slate-500">Passbook with a photograph issued by a Bank or Post Office.</p>
            </div>

          </div>
          
          <div className="mt-10 p-6 bg-red-50 rounded-2xl border border-red-100">
            <h4 className="text-red-700 font-bold mb-2">Important Note:</h4>
            <p className="text-red-600/80 text-sm">Even if your name is on the electoral roll, you must carry one of these original ID proofs to cast your vote. Photocopies or digital copies on phones are not allowed inside the polling booth.</p>
          </div>

        </div>
      </main>
    </div>
  );
}
