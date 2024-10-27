import React, { useEffect, useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import UserService from "../ApiService/UserService";
function AddFriendFrame(Props) {
  const { SetisAddFriend } = Props;
  const [poteintialF, setpoteintialF] = useState([]);
  const [Searchval, setSearchval] = useState("");
  const [addedFr, setaddedFr] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const[errorReport, seterrorReport]=useState(false)
  const[AddFriendStat, SetAddFriendstat] =useState(false)
  const showMoreResults = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { users, usersfetchError } = await UserService.AvailableFriends();
        setpoteintialF(users);
      } catch (error) {}
    };

    fetchUsers(); // Call the async function
  }, []);

  const HandleOnAdd = async (name) => {

    console.log(name)
    try {
      const res = await UserService.AddFriend(name);
      setaddedFr(name);
      SetAddFriendstat(true);
      console.log(res)
    } catch (error) { console.log(error);
      seterrorReport(true)
    }
  };
  return (
    <div
      onClick={() => {
        SetisAddFriend(false);
        SetAddFriendstat(false)
        seterrorReport(false)
        if(addedFr.length>0){
          window.location.reload()
          setaddedFr('')
        }
        
      }}
      className="fixed top-0 right-0  z-10 bg-slate-500   min-h-screen w-screen  "
    >
      {AddFriendStat && (
        <div className="bg-black bg-opacity-30 fixed z-20 flex justify-center min-h-screen w-full">
          <div className=" relative w-2/4 max-w-[250px] min-w-[180px] flex flex-col gap-4 rounded-[20px] h-max z-10 transform translate-y-6 p-3  bg-white">
            <div>
              Awesome, you and {addedFr} are now friend, you can now chat.
              enjoy :)
            </div>
            
          </div>
        </div>
      )}
      {errorReport && (
        <div className="bg-black bg-opacity-30 fixed z-20 flex justify-center min-h-screen w-full">
          <div className=" relative w-2/4 max-w-[250px] min-w-[180px] flex flex-col gap-4 rounded-[20px] h-max z-10 transform translate-y-6 p-3  bg-white">
            <div>
              Ooops , the was an error please try again in few minutes
            </div>
            
          </div>
        </div>
      )}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="min-h-[300px]  z-20  flex justify-center items-center flex-col w-full "
      >
        <div className="relative  h-max  w-[250px] ">
          <div className="absolute top-0 flex border w-full border-white rounded-md p-2">
            <LiaSearchSolid className="w-8 h-8" />
            <input
              type="text"
              className="border-none outline-none w-full bg-transparent"
              placeholder="Search for a friend by name"
              value={Searchval}
              onChange={(e) => {
                setSearchval(e.target.value);
              }}
            />
          </div>
          <div className="absolute border flex flex-col gap-1 border-white top-14 w-full bg-slate-200 p-2 rounded-md shadow-lg">
            {!Searchval && (
              <div className="text-gray-500 italic p-2">
                Start typing to search...
              </div>
            )}
            {poteintialF
              .filter(
                (fr) =>
                  Searchval &&
                  fr.name.toLowerCase().includes(Searchval.toLowerCase())
              )
              .slice(0, visibleCount) // Limit the displayed matches based on visibleCount
              .map((f) => (
                <div
                  key={f.id}
                  className="flex justify-between items-center hover:bg-slate-300 p-1 rounded-md cursor-pointer"
                >
                  <div className="w-full text-gray-800">{f.name}</div>
                  <button onClick={()=>{HandleOnAdd(f.name)}} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md">
                    Add
                  </button>
                </div>
              ))}
            {/* Show "No results found" if there are no matching items */}
            {Searchval &&
              poteintialF.filter((fr) =>
                fr.name.toLowerCase().includes(Searchval.toLowerCase())
              ).length === 0 && (
                <div className="text-gray-500 italic p-2">No results found</div>
              )}
            {/* Show "Show More" button if there are more items to display */}
            {visibleCount <
              poteintialF.filter((fr) =>
                fr.name.toLowerCase().includes(Searchval.toLowerCase())
              ).length && (
              <button
                onClick={showMoreResults}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-2 py-1 rounded-md mt-2 self-center"
              >
                Show More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFriendFrame;
