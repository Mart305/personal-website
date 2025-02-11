import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AssemblyExample {
  title: string;
  description: string;
  code: string;
  explanation: string;
}

const AssemblyVisualizer: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>('dot');

  const examples: Record<string, AssemblyExample> = {
    dot: {
      title: 'Dot Product Implementation',
      description: 'Assembly implementation of dot product calculation between two arrays',
      code: `
.global dot
dot:
  // uint16_t dot(uint8_t *a, uint8_t *b, byte length)
  push r28
  push r29
  movw r28, r24  // Move array a pointer to Y register
  movw r30, r22  // Move array b pointer to Z register
  mov r18, r20   // Copy length to r18
  clr r24        // Clear result registers
  clr r25
dot_loop:
  tst r18        // Check if length is zero
  breq dot_done  // If zero, exit loop
  ld r19, Y+     // Load from array a, post-increment
  ld r20, Z+     // Load from array b, post-increment
  mul r19, r20   // Multiply values
  add r24, r0    // Add lower byte to result
  adc r25, r1    // Add upper byte with carry
  dec r18        // Decrement counter
  rjmp dot_loop  // Continue loop
dot_done:
  pop r29
  pop r28
  ret`,
      explanation: `
This implementation:
1. Takes two arrays (a, b) and their length as parameters
2. Uses Y and Z registers for array pointers
3. Implements dot product: Σ(a[i] * b[i])
4. Handles 8-bit values producing 16-bit result
5. Uses hardware multiply instruction
6. Demonstrates register preservation
`
    },
    global: {
      title: 'Global Variable Handling',
      description: 'Working with global variables in assembly',
      code: `
.global updateGlobal
updateGlobal:
  // void updateGlobal(byte a)
  sts globalVar, r24  // Store value to global
  ret

.global getGlobal
getGlobal:
  // uint8_t getGlobal()
  lds r24, globalVar  // Load global into return register
  ret`,
      explanation: `
Key concepts demonstrated:
1. Global variable access using sts/lds
2. Parameter passing in r24
3. Return value handling
4. Memory-mapped variables
5. Direct memory operations
`
    },
    cString: {
      title: 'C-String Length Calculator',
      description: 'Assembly implementation of strlen for null-terminated strings',
      code: `
.global cStringLength
cStringLength:
  // uint8_t cStringLength(const char aString[])
  movw r30, r24   // Move string pointer to Z
  clr r24         // Clear length counter
length_loop:
  ld r18, Z+      // Load character, post-increment
  tst r18         // Test for null terminator
  breq done       // If null, we're done
  inc r24         // Increment length
  rjmp length_loop
done:
  ret`,
      explanation: `
This function:
1. Takes a pointer to a null-terminated string
2. Uses Z register for string traversal
3. Counts characters until null terminator
4. Demonstrates pointer arithmetic
5. Shows loop implementation
`
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Assembly Programming Examples</h2>

        <div className="flex flex-wrap gap-4 mb-6">
          {Object.keys(examples).map((key) => (
            <motion.button
              key={key}
              onClick={() => setSelectedExample(key)}
              className={`px-4 py-2 rounded-lg ${
                selectedExample === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {examples[key].title}
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">{examples[selectedExample].title}</h3>
            <p className="text-gray-700 mb-4">{examples[selectedExample].description}</p>
            <div className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{examples[selectedExample].code}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Implementation Details</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {examples[selectedExample].explanation}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Key Assembly Concepts</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Register Usage</h4>
              <ul className="list-disc list-inside text-gray-700">
                <li>r24-r25: Parameter/Return values</li>
                <li>Y (r28:r29): Data pointer</li>
                <li>Z (r30:r31): Data pointer</li>
                <li>r0:r1: Multiplication result</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Common Instructions</h4>
              <ul className="list-disc list-inside text-gray-700">
                <li>lds/sts: Load/Store to memory</li>
                <li>mul: Hardware multiplication</li>
                <li>push/pop: Stack operations</li>
                <li>breq/brne: Conditional branches</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssemblyVisualizer;