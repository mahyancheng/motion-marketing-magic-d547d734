
import { ChevronDown } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';

interface SectionNavigationProps {
  sectionId: number;
  targetSectionId: number;
  title: string;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({ sectionId, targetSectionId, title }) => {
  const { setActiveSection } = useOrder();
  
  const scrollToSection = (id: number) => {
    const section = document.getElementById(`section-${id}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="scroll-prompt mt-12 mb-6" onClick={() => scrollToSection(targetSectionId)}>
      <p className="font-bold leading-tight mb-6 font-medium mb-2">{title}</p>
      <div className="scroll-arrow text-brand-500">
        <ChevronDown size={24} />
      </div>
    </div>
  );
};

export default SectionNavigation;
