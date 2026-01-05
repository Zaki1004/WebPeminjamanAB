type Props = {
  title: string;
  value?: string | number;
  children?: React.ReactNode;
};

const Card = ({ title, value, children }: Props) => (
  <>
    <div className="border rounded-lg p-4 bg-white shadow flex flex-col w-full h-full">
      <h3 className="text-sm font-medium flex justify-center">{title}</h3>
      <div className="flex flex-col items-center justify-center flex-1">
        {value && <p className="text-6xl font-bold mt-2 ">{value}</p>}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  </>
);

export default Card;
