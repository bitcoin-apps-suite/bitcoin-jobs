// Re-export SimpleDock as Dock to fix webpack compilation issue
import SimpleDock from './SimpleDock';

const Dock = SimpleDock;

export default Dock;