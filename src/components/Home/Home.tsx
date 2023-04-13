import PickerEmoji, { EmojiClickData } from "emoji-picker-react";
import useEncoder from "../../hooks/useEncoder";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { encode } = useEncoder();

  const handleClick = (emoji: EmojiClickData): void => {
    const hash = window.btoa(encode(emoji.unified));
    navigate(`/add/${hash}`);
  };

  return (
    <>
      <h2>HomePage</h2>

      <PickerEmoji
        onEmojiClick={(emoji: EmojiClickData) => handleClick(emoji)}
      />
    </>
  );
};

export default Home;
