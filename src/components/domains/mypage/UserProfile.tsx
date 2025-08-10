// src/components/domains/UserProfile/UserProfile.tsx

type UserProfileProps = {
  profileImage: string;
  nickname: string;
  follower: number;
  following: number;
};

export default function UserProfile({ profileImage, nickname, follower, following }: UserProfileProps) {
  return (
    <div className="relative w-[100%] h-auto flex flex-row items-center justify-start gap-[25px]">
      <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
        <img src={profileImage} alt="프로필 사진" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between h-full">
        <p className="text-[20px]">{nickname}</p>
        <div className="flex gap-[60px] w-full items-center justify-start">
          <p className="text-[14px] text-gray-500">
            팔로우 <span>{following}</span>
          </p>
          <p className="text-[14px] text-gray-500">
            팔로워 <span>{follower}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
