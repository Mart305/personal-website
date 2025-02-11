import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-background to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi, I'm{' '}
            <span className="text-primary">
              Martin Rivera
            </span>
          </motion.h1>
          
          <motion.h2
            className="text-2xl md:text-3xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Computer Science Student at Washington University in St. Louis
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Passionate about software development, data analytics, and creating impactful solutions.
            Currently exploring the intersection of technology and finance.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="#contact"
              className="btn btn-primary"
            >
              Get in Touch
            </a>
            <a
              href="#experience"
              className="btn bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
            >
              View Experience
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
