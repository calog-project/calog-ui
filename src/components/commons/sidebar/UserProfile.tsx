import { FaUser } from 'react-icons/fa6';
import Image from 'next/image';

type TUserProfileProps = {
  user: {
    name: string;
    email: string;
    imgUrl: string | null;
  };
};

const UserProfile = ({ user }: TUserProfileProps) => {
  const { name, email, imgUrl } = user;

  const renderProfileImage = () =>
    imgUrl ? (
      <Image src={imgUrl} alt="유저 프로필 이미지" className="w-full h-full rounded-full object-cover" />
    ) : (
      <div className="flex justify-center items-center w-full h-full rounded-full bg-gray-d9">
        <FaUser className="text-white" size={80} />
      </div>
    );

  return (
    <div className="flex flex-col gap-8justify-center items-center">
      <div className={`flex justify-center items-center w-[120px] h-[120px] rounded-full`}>{renderProfileImage()}</div>
      <div className="flex flex-col justify-center items-center">
        <span className="text-center text-[20px] font-semibold leading-[30px]">{name}</span>
        <span className="text-gray-78 text-center text-4 font-medium leading-[30px]">{email}</span>
      </div>
    </div>
  );
};

export default UserProfile;
