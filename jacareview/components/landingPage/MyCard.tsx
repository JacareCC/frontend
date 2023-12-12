import React from 'react';  // Certifique-se de importar o React

interface TeamCardProps {
  imgSrc: string;
  name: string;
  role: string;
  socialLinks: Array<{ color: string; icon: string; url: string }>;
}

const TeamCard: React.FC<TeamCardProps> = ({ imgSrc, name, role, socialLinks }) => {
  return (
    <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
      <div className="h-[40vh] px-6">
        <img
          alt={name}
          src={imgSrc}
          className="shadow-lg rounded-full max-w-full mx-auto"
          style={{ maxWidth: "120px" }}
        />
        <div className="pt-6 text-center">
          <h5 className="text-xl font-bold">{name}</h5>
          <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
            {role}
          </p>
          <div className="mt-6">
            {socialLinks.map((link, index) => (
              <button
                key={index}
                className={`bg-${link.color} text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1`}
                type="button"
                onClick={() => window.open(link.url, '_blank')}
              >
                <img src={link.icon} alt={name} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
