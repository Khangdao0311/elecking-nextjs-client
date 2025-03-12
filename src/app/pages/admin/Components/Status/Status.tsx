function Status(props: { status: number; text: string }) {
  switch (props.status) {
    case 1:
      return (
        <p className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
          {props.text}
        </p>
      );
    case 2:
      return (
        <p className="px-3 py-1 text-xs font-normal text-yellow-800 bg-yellow-100 rounded-lg ">
          {props.text}
        </p>
      );
    case 3:
      return (
        <p className="px-3 py-1 text-xs font-normal text-blue-800 bg-blue-100 rounded-lg ">
          {props.text}
        </p>
      );
    case 4:
      return (
        <p className="px-3 py-1 text-xs font-normal text-gray-800 bg-gray-100 rounded-lg ">
          {props.text}
        </p>
      );
    case 0:
      return (
        <p className="px-3 py-1 text-xs font-normal text-red-800 bg-red-100 rounded-lg ">
          {props.text}
        </p>
      );
  }
}

export default Status;
