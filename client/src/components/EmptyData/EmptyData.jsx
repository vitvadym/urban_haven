import noData from '../../assets/empty.png';

export const EmptyData = () => {
  return (
    <div className='flex w-full justify-center '>
      <img
        src={noData}
        alt='empty'
      />
    </div>
  );
};

export default EmptyData;
