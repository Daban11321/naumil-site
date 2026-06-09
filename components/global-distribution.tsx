"use client"

import { useEffect, useRef } from "react"

const suppliedIds = new Set([826,528,756,380,620,8,504,578,246,348])
const idToName: Record<number, string> = {
  826:"United Kingdom", 528:"Netherlands", 756:"Switzerland",
  380:"Italy", 620:"Portugal", 8:"Albania", 504:"Morocco",
  578:"Norway", 246:"Finland", 348:"Hungary"
}

const countries = [
  "United Kingdom","Netherlands","Switzerland","Italy",
  "Portugal","Albania","Morocco","Norway","Finland","Hungary"
]

export function GlobalDistribution() {
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadAndRender = async () => {
      if (!svgRef.current) return

      const [d3Module, topoModule] = await Promise.all([
        import("d3"),
        import("topojson-client")
      ])
      const d3 = d3Module
      const topojson = topoModule

      const width = 960, height = 500
      const svg = d3.select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")

      const projection = d3.geoNaturalEarth1().scale(153).translate([width/2, height/2])
      const path = d3.geoPath().projection(projection)
      const tooltip = tooltipRef.current

      svg.append("path")
        .datum({type:"Sphere"} as any)
        .attr("fill","#0d0d0d")
        .attr("d", path as any)

      svg.append("path")
        .datum(d3.geoGraticule()() as any)
        .attr("fill","none")
        .attr("stroke","#1e1e1e")
        .attr("stroke-width","0.3")
        .attr("d", path as any)

      const world = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(r=>r.json())
      const countriesFeature = (topojson as any).feature(world, world.objects.countries)

      svg.selectAll(".cp")
        .data((countriesFeature as any).features)
        .join("path")
        .attr("fill", (d: any) => suppliedIds.has(+d.id) ? "#ffffff" : "#2a2a2a")
        .attr("stroke", (d: any) => suppliedIds.has(+d.id) ? "#aaaaaa" : "#333333")
        .attr("stroke-width", (d: any) => suppliedIds.has(+d.id) ? "0.6" : "0.4")
        .style("cursor", (d: any) => suppliedIds.has(+d.id) ? "pointer" : "default")
        .attr("d", path as any)
        .on("mousemove", function(event: any, d: any) {
          const name = idToName[+d.id]
          if (name && tooltip) {
            tooltip.style.opacity = "1"
            tooltip.style.left = (event.clientX + 15) + "px"
            tooltip.style.top = (event.clientY - 10) + "px"
            tooltip.textContent = name
          }
        })
        .on("mouseleave", () => {
          if (tooltip) tooltip.style.opacity = "0"
        })
    }

    loadAndRender()
  }, [])

  return (
    <section className="bg-[#1a1a1a] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] font-semibold tracking-[8px] uppercase text-white mb-4">Naumil</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-white mb-4">Global Distribution</h2>
          <div className="w-12 h-px bg-white opacity-30 mx-auto mb-5" />
          <p className="text-[9px] tracking-[3px] uppercase text-neutral-500">
            Supplying premium kitchen hardware & PVC edge bands worldwide
          </p>
        </div>
        <div className="w-full bg-[#111] overflow-hidden">
          <svg ref={svgRef} className="w-full h-auto block" />
        </div>
        <div className="flex gap-12 justify-center flex-wrap mt-10">
          {[{number:"10",label:"Countries"},{number:"3",label:"Continents"},{number:"4",label:"Regions"}].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-light text-white">{stat.number}</div>
              <div className="text-[9px] tracking-[3px] uppercase text-neutral-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap justify-center mt-8 max-w-2xl mx-auto">
          {countries.map((c) => (
            <span key={c} className="text-[9px] tracking-[2px] uppercase text-white border border-neutral-700 px-3 py-1.5">{c}</span>
          ))}
        </div>
      </div>
      <div
        ref={tooltipRef}
        className="fixed bg-white text-black text-[10px] tracking-[2px] uppercase px-3 py-1.5 pointer-events-none z-50 whitespace-nowrap"
        style={{ opacity: 0, transition: "opacity 0.2s" }}
      />
    </section>
  )
}
