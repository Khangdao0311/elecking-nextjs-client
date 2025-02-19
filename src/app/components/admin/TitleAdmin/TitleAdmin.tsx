"use client";
function TitleAdmin({ title = ''}) {
  return <div className="flex items-center bg-white shadow-xl rounded-lg px-7 py-3 relative">
    <div className="absolute left-0 top-0 bottom-0 w-[10px] bg-yellow-400 rounded-l-lg"></div>
    <p className="text-sm font-normal">{title}</p></div>;
}
export default TitleAdmin;
