import { useUser } from "../../context/CreateContext";

const MessageCard = ({ message }) => {
  const { user } = useUser();
  return (
    <>
      <div
        className={`max-w-3/4  my-2 px-3 py-1 bg-white dark:bg-black ${
          message?.senderId != user?._id ? "self-start" : "self-end"
        }  rounded-md  transition-all duration-300`}
      >
        {message?.message}
      </div>
    </>
  );
};
export default MessageCard;
