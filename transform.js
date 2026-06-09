const { sampleData } = require('./testdata')



function transformCanvas(canvasId, data) {

    let fdeTtl = 0
    for (const item of data.fdeItems){
    fdeTtl += item.baseHours * ( 1 + item.bufferPct / 100 )
    }

    // Table A
    const canvsA = {
        canvas_id: canvasId,
        company_name: data.customer.companyName,
        sf_opportunity_id: data.customer.salesforceOpportunityId,
        saved_by: data.savedBy,
        saved_at: data.updatedAt,
        engagement_phase: typeof data.engagementPhase === 'number' ? data.engagementPhase : 1,
        uc_count: data.selectedUseCases.length + data.customUseCases.length,
        fde_item_count: data.fdeItems.length,
        fde_total_hours: fdeTtl
    };


    //Table B
    const useCase = []
        for (const item of data.selectedUseCases){
            useCase.push ({ canvas_id: canvasId, uc_id: item, is_custom: false , status: data.ucStatus[item], design_priority: data.ucDesignPriority[item], phase: parseInt(data.useCasePhases[item]) })
        };

        for (const item of data.customUseCases){
            useCase.push ({ canvas_id: canvasId, uc_id: item.id, is_custom: true, status: data.ucStatus[item.id], design_priority: data.ucDesignPriority[item.id] || null, phase: parseInt(data.useCasePhases[item.id]) || null })
        };

    //LEGACY: flow-002 uses useCaseId as a single string instead of useCaseIds which is an array
    //Should normalize into an array
    //const useCaseIds = flow.useCaseIds || [flow.useCaseId]
    //DONE BELOW
    
    //Flow Repository (BONUS)
    const flowRepo = []
        for (const flow of data.flowsRepository){
            const useCaseIds = flow.useCaseIds || [flow.useCaseId]
            flowRepo.push ({ canvas_id: canvasId, flow_id: flow.id, name: flow.name, category: flow.category, flow_type: flow.flowType, status: flow.status, confirmed: flow.confirmed, use_case_ids: useCaseIds })
        }

    //Table C
    const fdeItems = []
        for (const item of data.fdeItems){
            fdeItems.push ({ canvas_id: canvasId, item_id: item.id, label: item.label, cluster: item.cluster, size: item.size, base_hours: item.baseHours, buffer_pct: item.bufferPct, total_hours: item.baseHours * (1 + item.bufferPct / 100), status: item.status, is_custom: item.isCustom, complexity_factor_count: item.complexityFactors.length})
        }



    // return tables
  return {
    canvases: [canvsA],
    canvas_use_cases: useCase,
    canvas_fde_items: fdeItems,
    canvas_flows: flowRepo
  };

};

// test
    const dryRun = process.argv.includes('--dry-run')
    const result = transformCanvas("test-id-123", sampleData);

    if (dryRun) {
        console.log('canvases: ', result.canvases.length)
        console.log('canvas_use_cases: ', result.canvas_use_cases.length)
        console.log('canvas_fde_items: ', result.canvas_fde_items.length)
        console.log('canvas_flows: ', result.canvas_flows.length)
    } 
    else {
        console.log(result);
    }


//TABLES SCHEMA
    const canvaSchema =[
        { name: 'canvas_id', type: 'STRING', mode: 'REQUIRED' },
        { name: 'company_name', type: 'STRING', mode: 'NULLABLE' },
        { name: 'sf_opportunity_id', type: 'STRING', mode: 'NULLABLE' },
        { name: 'saved_by', type: 'STRING', mode: 'NULLABLE' },
        { name: 'saved_at', type: 'TIMESTAMP', mode: 'NULLABLE' },
        { name: 'engagement_phase', type: 'INT64', mode: 'REQUIRED' },
        { name: 'uc_count', type: 'INT64', mode: 'REQUIRED' },
        { name: 'fde_item_count', type: 'INT64', mode: 'NULLABLE' },
        { name: 'fde_total_hours', type: 'FLOAT64', mode: 'NULLABLE' }
    ]    

    const useCaseSchema = [   
        { name: 'canvas_id', type: 'STRING', mode: 'REQUIRED' },
        { name: 'uc_id', type: 'STRING', mode: 'REQUIRED' },
        { name: 'is_custom', type: 'BOOL', mode: 'REQUIRED' },
        { name: 'status', type: 'STRING', mode: 'NULLABLE' },
        { name: 'design_priority', type: 'STRING', mode: 'NULLABLE' },
        { name: 'phase', type: 'INT64', mode: 'NULLABLE' }
    ]

    //BONUS
    const flowSchema =[
        { name: 'canvas_id', type: 'STRING', mode: 'REQUIRED' },
        { name: 'flow_id', type: 'STRING', mode: 'REQUIRED' },
        { name: 'name', type: 'STRING', mode: 'NULLABLE' },
        { name: 'category', type: 'STRING', mode: 'NULLABLE' },
        { name: 'flow_type', type: 'STRING', mode: 'NULLABLE' },
        { name: 'status', type: 'STRING', mode: 'REQUIRED' },
        { name: 'confirmed', type: 'BOOL', mode: 'REQUIRED' },
        { name: 'use_case_ids', type: 'STRING', mode: 'REPEATED' },
    ] 

    const itemSchema = [   
        { name: 'canvas_id', type: 'STRING', mode: 'REQUIRED' },
        { name: 'item_id', type: 'STRING', mode: 'REQUIRED' },
        { name: 'label', type: 'STRING', mode: 'REQUIRED' },
        { name: 'cluster', type: 'STRING', mode: 'REQUIRED' },
        { name: 'size', type: 'STRING', mode: 'REQUIRED' },
        { name: 'base_hours', type: 'FLOAT64', mode: 'REQUIRED' },
        { name: 'buffer_pct', type: 'FLOAT64', mode: 'REQUIRED' },
        { name: 'total_hours', type: 'FLOAT64', mode: 'REQUIRED' },
        { name: 'status', type: 'STRING', mode: 'NULLABLE' },
        { name: 'is_custom', type: 'BOOL', mode: 'REQUIRED' },
        { name: 'complexity_factor_count', type: 'INT64', mode: 'REQUIRED' },
    ]

module.exports = {transformCanvas}            