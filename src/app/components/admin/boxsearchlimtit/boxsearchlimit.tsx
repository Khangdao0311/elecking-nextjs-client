"use client";
import React from 'react';
import { Select } from 'antd';
const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
function boxsearchlimit({ title = ''}) {
  return <>
<div className="flex items-center bg-white shadow-xl rounded-lg px-7 py-3 justify-between">
<div className="flex gap-4 items-center">
  <p>Tìm kiếm:</p>
  <input type="text" className="w-80 h-8 border rounded outline-none" />
</div>
<div className="flex gap-2 items-center">
  <p>Hiện</p>
  <Select
defaultValue="lucy"
style={{ width: 120 }}
onChange={handleChange}
options={[
{ value: 'jack', label: 'Jack' },
{ value: 'lucy', label: 'Lucy' },
{ value: 'Yiminghe', label: 'yiminghe' },
{ value: 'disabled', label: 'Disabled', disabled: true },
]}
/>
  <p>{title}</p>
</div>
</div>
</>


}
export default boxsearchlimit;