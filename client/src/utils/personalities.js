export default function checkType(string) {
  let data = [];
  switch (string) {
    case 'INFJ': // The Advocate
      data = ['cooking/baking', 11260433011];
      return data;
    case 'INFP': // The Mediator
      data = ['creative writing', 2617942011];
      return data;
      case 'ENFP': // The Campaigner
      data = ['instruments all', 11965861];
      return data;
    case 'ENFJ': // The Protagonist
      data = ['writing', 1084128];
      return data;
      case 'INTJ': // The Architect
      data = ['sports', 3375301];
      return data;
    case 'INTP': // The Logician
      data = ['strategy games,', 165795011];
      return data;
      case 'ENTJ': // The Commander
      data = ['How to business', 1000];
      return data;
    case 'ENTP': // The Debater
      data = ['canvas painting', 4991426011];
      return data;
      case 'ISFJ': // The Defender
      data = ['Patio', 3238155011];
      return data;
      case 'ISFP': // The Adventurer
      data = ['DIY', 2617942011];
      return data;
      case 'ESFJ': // The Consul
      data = ['cooking homemade tool', 2617942011];
      return data;
      case 'ESFP': // The Entertainer
      data = ['home improvement ideas', 1000];
      return data;
      case 'ISTJ': // The Logistician
      data = ['mind puzzles', 165795011];
      return data;
      case 'ISTP': // The Virtuoso
      data = ['creative writing', 'gift_ideas_arts_crafts'];
      return data;
      case 'ESTJ': // The Executive
      data = ['creative writing', 'gift_ideas_arts_crafts'];
      return data;
      case 'ESTP': // The Entrepreneur
      data = ['creative writing', 'gift_ideas_arts_crafts'];
      return data;

    default:
      data = ['dogs', 'books']
      return data;
  }
}