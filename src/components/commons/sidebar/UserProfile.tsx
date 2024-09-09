import { FaUser } from 'react-icons/fa6';

type TUserProfileProps = {
  user: {
    name: string;
    email: string;
    imgUrl: string | null;
  };
  isOpen: boolean;
};

const UserProfile = ({ user, isOpen }: TUserProfileProps) => {
  const { name, email, imgUrl } = user;

  const renderProfileImage = () =>
    imgUrl ? (
      <img src={imgUrl} alt="유저 프로필 이미지" className="w-full h-full rounded-full object-cover" />
    ) : (
      <div className="flex justify-center items-center w-full h-full rounded-full bg-gray-d9">
        <FaUser className="text-white" size={isOpen ? 80 : 20} />
      </div>
    );

  return (
    <div className={`flex ${isOpen ? 'flex-col gap-8' : ''} justify-center items-center`}>
      <div
        className={`flex justify-center items-center ${isOpen ? 'w-[120px] h-[120px]' : 'w-[30px] h-[30px]'} rounded-full`}>
        {renderProfileImage()}
      </div>
      {isOpen && (
        <div className="flex flex-col justify-center items-center">
          <span className="text-center text-[20px] font-semibold leading-[30px]">{name}</span>
          <span className="text-gray-78 text-center text-4 font-medium leading-[30px]">{email}</span>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
