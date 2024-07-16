import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import React from "react";

const page = async () => {
  const result = await getAllUsers({});
  console.log("Result from User Action", result);

  const allUsers = result;
  //   const allUsers = [
  //     {
  //       name: "John Doe",
  //       profilePic:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //       userName: "user_name",
  //       topTags: ["html", "reactjs"],
  //     },
  //     {
  //       name: "Saunak Paul Choudhury",
  //       profilePic:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //       userName: "user_name",
  //       topTags: ["html", "reactjs"],
  //     },
  //     {
  //       name: "Jonaki Roy",
  //       profilePic:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //       userName: "user_name",
  //       topTags: ["html", "reactjs"],
  //     },
  //     {
  //       name: "Amit Roy",
  //       profilePic:
  //         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //       userName: "user_name",
  //       topTags: ["html", "reactjs"],
  //     },
  //   ];
  return (
    <section>
      <h1 className="h1-bold"> All Users </h1>
      <div className="mt-5 flex gap-5">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          placeHolder="Search by username"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />

        <Filter
          route="/community"
          filters={UserFilters}
          placeHolder="Select a Filter"
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {allUsers.length > 0 ? (
          allUsers.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div> No users yet </div>
        )}
      </div>
    </section>
  );
};

export default page;
