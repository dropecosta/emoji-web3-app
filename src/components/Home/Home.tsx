import PickerEmoji, { EmojiClickData } from "emoji-picker-react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (emoji: EmojiClickData): void => {
    console.log(emoji);
    const hash = window.btoa(emoji.unified);
    navigate(`/add/${hash}`);
  };

  return (
    <>
      <h1>Pick a emoji</h1>
      <div className="container">
        <PickerEmoji
          onEmojiClick={(emoji: EmojiClickData) => handleClick(emoji)}
        />
      </div>
    </>
  );
};

export default Home;
