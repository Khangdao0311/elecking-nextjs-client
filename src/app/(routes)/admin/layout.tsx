export default function DefaultLayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-stone-100">{children}</div>;
}
