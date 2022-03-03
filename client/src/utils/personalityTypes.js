export default function personalityTypes(string) {
    let data = [];
    switch (string) {
      case 'INFJ': // The Advocate
        data = ['The Advocate', 
        'A nurturers with the drive to help others to realize their potential. This person has a strong sense of personal integrity, creativity and dedication with talent for helping others through their personal challenges.'];
        return data;
      case 'INFP': // The Mediator
        data = ['The Mediator', 
        'An imaginative idealists who is guided by core values and beliefs. The mediator see possibilities for a better future, look at reality as a passing concern, and pursue truth and meaning with their own charisma.'];
        return data;
        case 'ENFP': // The Campaigner
        data = ['The Campaigner', 
        'This person is people-centered with a focus on possibilities. Their contagious enthusiasm for new ideas, people and activities  embodies their energetic, warmth, and passionate trait to help others explore their own creative potential.'];
        return data;
      case 'ENFJ': // The Protagonist
        data = ['The Protagonist', 
        'An idealist organizers who is envision of what is best for humanity. They are the motivation for human growth through their ability to see potential in others and convince others to join their ideas.'];
        return data;
        case 'INTJ': // The Architect
        data = ['The Architect', 
        'An analytical problem-solvers who is eager to improve systems and processes with innovative ideas. They can see possibilities for improvement at work, at home, or in themselves.'];
        return data;
      case 'INTP': // The Logician
        data = ['The Logician',
        'INTPs are philosophical innovators who are fascinated by logical analysis, systems, and design. They spent time theorizing and searching  for the universal law behind everything. They have the need to understand life and all of its complexity.'];
        return data;
        case 'ENTJ': // The Commander
        data = ['The Commander', 
        'A strategic leader who is motivated to organize change and are quick to see inefficiency while conceptualize new solutions. They enjoy developing long-term plans to accomplish their goals who  is a logical reasoner, articulate and quick-witted.'];
        return data;
      case 'ENTP': // The Debater
        data = ['The Debater', 
        'An inspired innovators who is motivated to find new solutions to intellectually challenging problems. This personality are curious, clever, and seek to understand people, systems, and principles that surround them'];
        return data;
        case 'ISFJ': // The Defender
        data = ['The Defender', 
        'This personality are industrious caretakers who embodied traditions and organizations. They are practical, compassionate, caring, and tends to provide for others by protecting them from danger.'];
        return data;
        case 'ISFP': // The Adventurer
        data = ['The Adventurer', 
        'ISFPs are gentle caretakers who live in the moment and enjoy their surroundings with cheerful, low-key enthusiasm. They are flexible, spontaneous, and take life in strides ever bending with the natural flow of what life has to offer.'];
        return data;
        case 'ESFJ': // The Consul
        data = ['The Consul', 
        'ESFJs are conscientious helpers who are sensitive to the needs of others and energetically dedicated to responsibilities. They are in tune with their emotional environment and attentive to the feelings of others and well as how others percieved them.'];
        return data;
        case 'ESFP': // The Entertainer
        data = ['The Entertainer', 
        'A vivacious entertainers who charms people around them. They are spontaneous, energetic, fun-loving, and take pleasure in the things  that surrounds them like food, clothes, nature, animals, and especially people.'];
        return data;
        case 'ISTJ': // The Logistician
        data = ['ISTJ', 
        'ISTJs are responsible organizers who is driven to create and enforce order within a system or institution. They tend to have a procedure for everything they do and embodied neatness in every aspect of their life.'];
        return data;
        case 'ISTP': // The Virtuoso
        data = ['ISTP', 
        'An artisans with an understanding of mechanics and an interest in troubleshooting. This person approaches their surroundings with a flexible logic and practical solutions to the problems at hand.'];
        return data;
        case 'ESTJ': // The Executive
        data = ['The Executive', 
        'ESTJs are hardworking traditionalists who is eager to take charge in organizing projects and people. This person is orderly, rule-abiding, and conscientious. They like to get things done and approach projects in a systematic, methodical way.'];
        return data;
        case 'ESTP': // The Entrepreneur
        data = ['The Entrepreneur', 
        'Thrillseekers who are at their best when facing danger. Their fierce energy can be felt when they are interactimg with others and the world around them.'];
        return data;
  
      default:
        data = ['dogs', 'books']
        return data;
    }
  }