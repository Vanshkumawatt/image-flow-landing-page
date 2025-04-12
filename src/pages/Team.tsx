
import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Team = () => {
  const team = [
    { name: "Alex Johnson", role: "CEO & Co-founder", initials: "AJ" },
    { name: "Sarah Chen", role: "CTO & Co-founder", initials: "SC" },
    { name: "David Patel", role: "Head of Education", initials: "DP" },
    { name: "Maria Rodriguez", role: "UX Designer", initials: "MR" }
  ];

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />
      <div className="py-16 px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Our Team</h1>
        <p className="text-lg mb-12 text-center">
          Meet the passionate individuals behind Orielix who are dedicated to transforming education.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarFallback className="bg-indigo-600 text-white text-2xl">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
