import Calculator from '@/components/Calculator';

export default function Page() {
  return (
    <main className="fixed inset-0 w-screen h-screen bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="w-full h-full max-w-md flex flex-col items-center justify-center">
        <Calculator />
      </div>
    </main>
  );
}
