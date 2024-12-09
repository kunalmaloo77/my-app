import Image from "next/image";

type Artist = {
  name: string;
  image: string;
  monthlyListeners: string;
};

export const ArtistBanner = ({ artist }: { artist: Artist }) => {
  return (
    <div className="flex items-center relative w-full h-[343px] text-white overflow-hidden px-4 lg:px-12">
      {/* Background */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-red-pattern bg-cover bg-center opacity-35 rounded-3xl"></div>

      {/* Text Content */}
      <div className="relative z-10 mt-24 lg:mt-20 flex flex-col justify-center space-y-2">
        {/* Verified Badge */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="6.92307"
                y="8.46153"
                width="15.3846"
                height="14.6154"
                fill="#F6F6F6"
              />
              <path
                d="M15.7125 27.6H14.3812L11.25 24.375H6.61874L5.62499 23.4375V18.9L2.45624 15.675V14.3437L5.62499 11.1187V6.5625L6.61874 5.625H11.25L14.3812 2.41875H15.7125L18.9375 5.625H23.4937L24.4312 6.54375V11.1187L27.6375 14.3437V15.675L24.375 18.9V23.4375L23.4375 24.375H18.9375L15.7125 27.6ZM12.6187 19.65H13.95L21.0187 12.5812L19.6875 11.25L13.2937 17.6625L10.7062 15.075L9.37499 16.4062L12.6187 19.65Z"
                fill="url(#paint0_linear_1_146)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_146"
                  x1="15.0469"
                  y1="2.41875"
                  x2="35.4157"
                  y2="15.3084"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#53E0FF" />
                  <stop offset="1" stopColor="#1E94E9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-md lg:text-lg font-semibold">
            Verified Artist
          </span>
        </div>

        {/* Artist Name */}
        <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
          {artist.name}
        </h1>

        {/* Monthly Listeners */}
        <p className="text-sm lg:text-md font-light text-gray-300">
          27.852.501 monthly listeners
        </p>
      </div>

      {/* Artist Image */}
      <div className="absolute right-[-80px]">
        <Image
          src="/images/michael-jackson.png" // Replace with the actual path to your artist image
          alt="Michael Jackson"
          width={535}
          height={452}
        />
      </div>
    </div>
  );
};
