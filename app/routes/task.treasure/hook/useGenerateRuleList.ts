import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface GenerateRuleListProps {
  betRequirement?: string | null
  directSubBetRequirement?: string | null
}

export const useGenerateRuleList = () => {
  const { t } = useTranslation()
  return useCallback(
    ({ betRequirement, directSubBetRequirement }: GenerateRuleListProps): string[] => {
      const ruleList: string[] = []

      if (betRequirement && betRequirement !== '0') {
        ruleList.push(t('treasure.betRequirement', { value: betRequirement }))
      }

      if (directSubBetRequirement && directSubBetRequirement !== '0') {
        ruleList.push(t('treasure.directSubBetRequirement', { value: directSubBetRequirement }))
      }

      return ruleList
    },
    [t]
  )
}
