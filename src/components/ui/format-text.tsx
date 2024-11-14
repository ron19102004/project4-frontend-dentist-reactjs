import React from "react";

interface FormatTextProps {
  text?: string;
}

const FormatText: React.FC<FormatTextProps> = ({ text }) => {
  const formatText = (text: string) => {
    const sections = text.split("\n").map((line, index) => {

      // Kiểm tra các dòng có dạng số thứ tự
      if (line.match(/^\d+\./)) {
        return (
          <h2 key={index} className="font-bold text-xl mb-2">{line}</h2>
        );
      } 
      
      // Kiểm tra các dòng có ký hiệu ✔
      else if (line.match(/^✔/)) {
        return (
          <ul key={index} className="list-disc pl-6">
            <li className="text-base">{line.replace("✔", "").trim()}</li>
          </ul>
        );
      } 
      
      // Các đoạn văn bản bình thường
      else {
        return (
          <p key={index} className="text-base mb-2">{line}</p>
        );
      }
    });

    return sections;
  };

  return <>{text && formatText(text)}</>;
};

export default FormatText;
