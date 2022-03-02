export default function checkType(string) {
  let data = [];
  switch (string) {
    case 'INFJ': // The Advocate
      data = ['cooking/baking', 'gift_ideas_homemade'];
      return data;
    case 'INFP': // The Mediator
      data = ['creative writing', 'gift_ideas_arts_crafts'];
      return data;
      case 'ENFP': // The Campaigner
      data = ['cooking/baking', 'gift_ideas_homemade'];
      return data;
    case 'ENFJ': // The Protagonist
      data = ['creative writing', 'gift_ideas_arts_crafts'];
      return data;
      case 'INTJ': // The Architect
      data = ['cooking/baking', 'gift_ideas_homemade'];
      return data;
    case 'INTP': // The Logician
      data = ['creative writing', 'gift_ideas_arts_crafts'];
      return data;
      case 'ENTJ': // The Commander
      data = ['cooking/baking', 'gift_ideas_homemade'];
      return data;
    case 'ENTP': // The Debater
      data = ['creative writing', 'gift_ideas_arts_crafts'];
      return data;
      case 'ISFP': // The Defender
      data = ['creative writing', 'gift_ideas_arts_crafts'];
      return data;
      case 'ESFJ': // The Consul
      data = ['creative writing', 'gift_ideas_arts_crafts'];
      return data;
      case 'ESFP': // The Entertainer
      data = ['creative writing', 'gift_ideas_arts_crafts'];
      return data;
      case 'ISTJ': // The Logistician
      data = ['creative writing', 'gift_ideas_arts_crafts'];
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