import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Loading = () => {
    return (
        <div>
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto text-center w-full"
            >
              <motion.div 
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              >
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Configurando tu Car Wash
              </h2>
              <p className="text-muted-foreground mb-8">
                Estamos preparando todo para ti...
              </p>
              
              <div className="flex justify-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
        </div>
    );
}

export default Loading;
