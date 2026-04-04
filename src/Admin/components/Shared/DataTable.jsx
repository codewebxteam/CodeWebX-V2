import React from "react";
import { motion } from "framer-motion";

const DataTable = ({ columns, data, emptyMessage = "No Data Streams Detected" }) => {
  return (
    <div className="w-full bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5">
              {columns.map((col, idx) => (
                <th key={idx} className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <motion.tr 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  transition={{ delay: rowIndex * 0.05 }}
                  key={rowIndex} 
                  className="hover:bg-white/[0.01] transition-all group"
                >
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex} className="p-6 text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                      {value}
                    </td>
                  ))}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-24 text-center">
                  <div className="flex flex-col items-center gap-3 opacity-20">
                    <div className="w-12 h-12 border-2 border-dashed border-white rounded-full animate-spin-slow"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em]">{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;