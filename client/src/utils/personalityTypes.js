export default function personalityTypes(string) {
    let data = [];
    switch (string) {
      case 'INFJ': // The Advocate
        data = ['The Advocate', 
        'INFJs are creative nurturers with a strong sense of personal integrity and a drive to help others realize their potential. Creative and dedicated, they have a talent for helping others with original solutions to their personal challenges.'];
        return data;
      case 'INFP': // The Mediator
        data = ['The Mediator', 
        'INFPs are imaginative idealists, guided by their own core values and beliefs. To a Healer, possibilities are paramount; the reality of the moment is only of passing concern. They see potential for a better future, and pursue truth and meaning with their own flair.'];
        return data;
        case 'ENFP': // The Campaigner
        data = ['The Campaigner', 
        'ENFPs are people-centered creators with a focus on possibilities and a contagious enthusiasm for new ideas, people and activities. Energetic, warm, and passionate, ENFPs love to help other people explore their creative potential.'];
        return data;
      case 'ENFJ': // The Protagonist
        data = ['The Protagonist', 
        'ENFJs are idealist organizers, driven to implement their vision of what is best for humanity. They often act as catalysts for human growth because of their ability to see potential in other people and their charisma in persuading others to their ideas.'];
        return data;
        case 'INTJ': // The Architect
        data = ['The Architect', 
        'INTJs are analytical problem-solvers, eager to improve systems and processes with their innovative ideas. They have a talent for seeing possibilities for improvement, whether at work, at home, or in themselves.'];
        return data;
      case 'INTP': // The Logician
        data = ['The Logician',
        'INTPs are philosophical innovators, fascinated by logical analysis, systems, and design. They are preoccupied with theory, and search for the universal law behind everything they see. They want to understand the unifying themes of life, in all their complexity.'];
        return data;
        case 'ENTJ': // The Commander
        data = ['The Commander', 
        'ENFJs are idealist organizers, driven to implement their vision of what is best for humanity. They often act as catalysts for human growth because of their ability to see potential in other people and their charisma in persuading others to their ideas.'];
        return data;
      case 'ENTP': // The Debater
        data = ['The Debater', 
        'ENTPs are inspired innovators, motivated to find new solutions to intellectually challenging problems. They are curious and clever, and seek to comprehend the people, systems, and principles that surround them'];
        return data;
        case 'ISFJ': // The Defender
        data = ['The Defender', 
        'ISFJs are industrious caretakers, loyal to traditions and organizations. They are practical, compassionate, and caring, and are motivated to provide for others and protect them from the perils of life.'];
        return data;
        case 'ISFP': // The Adventurer
        data = ['The Adventurer', 
        'ISFPs are gentle caretakers who live in the present moment and enjoy their surroundings with cheerful, low-key enthusiasm. They are flexible and spontaneous, and like to go with the flow to enjoy what life has to offer.'];
        return data;
        case 'ESFJ': // The Consul
        data = ['The Consul', 'ESFJs are conscientious helpers, sensitive to the needs of others and energetically dedicated to their responsibilities. They are highly attuned to their emotional environment and attentive to both the feelings of others and the perception others have of them.'];
        return data;
        case 'ESFP': // The Entertainer
        data = ['The Entertainer', 
        'ESFPs are vivacious entertainers who charm and engage those around them. They are spontaneous, energetic, and fun-loving, and take pleasure in the things around them: food, clothes, nature, animals, and especially people.'];
        return data;
        case 'ISTJ': // The Logistician
        data = ['ISTJ', 
        'ISTJs are responsible organizers, driven to create and enforce order within systems and institutions. They are neat and orderly, inside and out, and tend to have a procedure for everything they do.'];
        return data;
        case 'ISTP': // The Virtuoso
        data = ['ISTP', 
        'ISTPs are observant artisans with an understanding of mechanics and an interest in troubleshooting. They approach their environments with a flexible logic, looking for practical solutions to the problems at hand.'];
        return data;
        case 'ESTJ': // The Executive
        data = ['The Executive', 
        'ESTJs are hardworking traditionalists, eager to take charge in organizing projects and people. Orderly, rule-abiding, and conscientious, ESTJs like to get things done, and tend to go about projects in a systematic, methodical way.'];
        return data;
        case 'ESTP': // The Entrepreneur
        data = ['The Entrepreneur', 
        'ESTPs are energetic thrillseekers who are at their best when putting out fires, whether literal or metaphorical. They bring a sense of dynamic energy to their interactions with others and the world around them.'];
        return data;
  
      default:
        data = ['dogs', 'books']
        return data;
    }
  }