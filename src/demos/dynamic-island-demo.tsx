"use client"

import { useEffect, useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Component,
  DynamicContainer,
  DynamicIslandProvider,
  SizePresets,
  useDynamicIslandSize,
} from "@/components/ui/dynamic-island"

import DemoHeader from "@/components/DemoHeader"
import OrderProcessingSection from "@/components/OrderProcessingSection"
import InventorySection from "@/components/InventorySection"
import FulfillmentSection from "@/components/FulfillmentSection"
import CustomerSection from "@/components/CustomerSection"
import AnalyticsSection from "@/components/AnalyticsSection"
import CustomizationSection from "@/components/CustomizationSection"

function StepsNavigator() {
  const { state, setSize } = useDynamicIslandSize()
  const [step, setStep] = useState(0)

  const steps = useMemo(
    () =>
      [
        {
          key: "intro",
          label: "Overview",
          size: "tall" as SizePresets,
          content: (
            <DynamicContainer className="h-full w-full overflow-auto">
              <div className="p-4">
                <DemoHeader />
              </div>
            </DynamicContainer>
          ),
        },
        {
          key: "orders",
          label: "Orders",
          size: "ultra" as SizePresets,
          content: (
            <DynamicContainer className="h-full w-full overflow-auto">
              <div className="p-4">
                <OrderProcessingSection />
              </div>
            </DynamicContainer>
          ),
        },
        {
          key: "inventory",
          label: "Inventory",
          size: "ultra" as SizePresets,
          content: (
            <DynamicContainer className="h-full w-full overflow-auto">
              <div className="p-4">
                <InventorySection />
              </div>
            </DynamicContainer>
          ),
        },
        {
          key: "fulfillment",
          label: "Fulfillment",
          size: "ultra" as SizePresets,
          content: (
            <DynamicContainer className="h-full w-full overflow-auto">
              <div className="p-4">
                <FulfillmentSection />
              </div>
            </DynamicContainer>
          ),
        },
        {
          key: "customers",
          label: "Customers",
          size: "ultra" as SizePresets,
          content: (
            <DynamicContainer className="h-full w-full overflow-auto">
              <div className="p-4">
                <CustomerSection />
              </div>
            </DynamicContainer>
          ),
        },
        {
          key: "analytics",
          label: "Analytics",
          size: "massive" as SizePresets,
          content: (
            <DynamicContainer className="h-full w-full overflow-auto">
              <div className="p-4">
                <AnalyticsSection />
              </div>
            </DynamicContainer>
          ),
        },
        {
          key: "customize",
          label: "Customization",
          size: "ultra" as SizePresets,
          content: (
            <DynamicContainer className="h-full w-full overflow-auto">
              <div className="p-4">
                <CustomizationSection />
              </div>
            </DynamicContainer>
          ),
        },
      ],
    []
  )

  useEffect(() => {
    setSize(steps[step].size)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  return (
    <div className="h-full w-full">
      <div className="absolute left-2 top-2 flex items-center gap-2">
        <Button onClick={prev} disabled={state.isAnimating || step === 0} variant="secondary">
          Back
        </Button>
        <Button onClick={next} disabled={state.isAnimating || step === steps.length - 1}>
          Next
        </Button>
      </div>
      <div className="absolute right-2 top-2 flex items-center gap-2">
        <Badge variant="outline">Step {step + 1} / {steps.length}</Badge>
        <Badge variant="outline">Size: {state.size}</Badge>
      </div>
      {steps[step].content}
    </div>
  )
}

function DynamicIslandDemo() {
  return (
    <DynamicIslandProvider initialSize={"default"}>
      <div className="relative min-h-[520px]">
        <Component id="dynamic-blob">
          <StepsNavigator />
        </Component>
      </div>
    </DynamicIslandProvider>
  )
}
export default DynamicIslandDemo
