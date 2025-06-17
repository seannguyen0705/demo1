import DialogPassword from './DialogPassword';

export default function ChangePassword() {
  return (
    <section className="bg-light-green space-y-4 rounded-[20px] dark:bg-gray-900 p-4">
      <h2 className="text-2xl font-bold">Mật khẩu</h2>
      <DialogPassword />
    </section>
  );
}
