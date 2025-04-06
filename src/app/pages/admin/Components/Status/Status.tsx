function Status(props: { status: number; text: string }) {
  switch (props.status) {
    case 1:
      return (
        <div className="flex justify-center">
          <p className="px-3 py-1 w-[140px] text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
            {props.text}
          </p>
        </div>
      );
    case 2:
      return (
        <div className="flex justify-center">
          <p className="px-3 py-1 w-[140px] text-xs font-normal text-yellow-800 bg-yellow-100 rounded-lg ">
            {props.text}
          </p>
        </div>
      );
    case 3:
      return (
        <div className="flex justify-center">
          <p className="px-3 py-1 w-[140px] text-xs font-normal text-blue-800 bg-blue-100 rounded-lg ">
            {props.text}
          </p>
        </div>

      );
    case 4:
      return (
        <div className="flex justify-center">
          <p className="px-3 py-1 w-[140px] text-xs font-normal text-gray-800 bg-gray-100 rounded-lg ">
            {props.text}
          </p>
        </div>

      );
    case 0:
      return (
        <div className="flex justify-center">
          <p className="px-3 py-1 w-[140px] text-xs font-normal text-red-800 bg-red-100 rounded-lg ">
            {props.text}
          </p>
        </div>

      );
  }
}

export default Status;
