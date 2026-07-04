import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { SkillChip } from "../components/ui/SkillChip";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Skills() {
  return (
    <section id="skills" className="container-page section scroll-mt-24">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        className="font-mono-caps mb-4"
      >
        02 · Skills
      </motion.p>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        style={{ fontSize: "var(--text-display-lg)", fontWeight: 700 }}
        className="mb-12 max-w-2xl"
      >
        A <span className="text-gradient-synapse">fundamentals-first</span> toolkit.
      </motion.h2>

      <div className="space-y-10">
        {profile.skills.map((group, gi) => (
          <div key={group.category}>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={reveal}
              transition={{ delay: gi * 0.05 }}
              className="font-mono-caps mb-4"
              style={{ color: "var(--color-signal)" }}
            >
              {group.category}
            </motion.p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map((item, ii) => (
                <motion.div
                  key={item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={reveal}
                  transition={{ delay: gi * 0.05 + ii * 0.04 }}
                >
                  <SkillChip label={item} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
